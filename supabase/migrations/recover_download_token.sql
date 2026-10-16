BEGIN;

CREATE OR REPLACE FUNCTION public.recover_download_token(
    p_order_id TEXT,
    p_token_hash TEXT,
    p_expires_at TIMESTAMPTZ
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $function$
DECLARE
    v_db_order_id UUID;
    v_order_status TEXT;
BEGIN
    -- Validate inputs.
    IF p_order_id IS NULL OR btrim(p_order_id) = '' THEN
        RETURN json_build_object(
            'success', FALSE,
            'message', 'Order ID is required'
        );
    END IF;

    IF p_token_hash IS NULL
       OR p_token_hash !~ '^[0-9a-f]{64}$' THEN
        RETURN json_build_object(
            'success', FALSE,
            'message', 'Invalid token hash'
        );
    END IF;

    IF p_expires_at IS NULL OR p_expires_at <= now() THEN
        RETURN json_build_object(
            'success', FALSE,
            'message', 'Token expiry must be in the future'
        );
    END IF;

    -- Lock the matching order row to serialize recovery attempts.
    SELECT id, status
      INTO v_db_order_id, v_order_status
      FROM public.delivery_orders
     WHERE cashfree_order_id = p_order_id
     FOR UPDATE;

    IF NOT FOUND THEN
        RETURN json_build_object(
            'success', FALSE,
            'message', 'Order not found'
        );
    END IF;

    IF v_order_status <> 'paid' THEN
        RETURN json_build_object(
            'success', FALSE,
            'message', 'Order is not paid'
        );
    END IF;

    -- Remove old unused tokens first, satisfying the partial unique index.
    DELETE FROM public.download_tokens
     WHERE order_id = v_db_order_id
       AND used_at IS NULL;

    -- Insert the replacement token hash.
    INSERT INTO public.download_tokens (
        order_id,
        token_hash,
        expires_at
    )
    VALUES (
        v_db_order_id,
        p_token_hash,
        p_expires_at
    );

    RETURN json_build_object(
        'success', TRUE,
        'message', 'Download token recovered successfully'
    );

EXCEPTION
    WHEN unique_violation THEN
        RETURN json_build_object(
            'success', FALSE,
            'message', 'A conflicting active token exists; retry recovery'
        );
    WHEN OTHERS THEN
        RAISE WARNING 'recover_download_token failed: %', SQLERRM;
        RETURN json_build_object(
            'success', FALSE,
            'message', 'Recovery failed'
        );
END;
$function$;

-- Restrict execution to the trusted server-side service role.
REVOKE ALL ON FUNCTION public.recover_download_token(
    TEXT, TEXT, TIMESTAMPTZ
) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.recover_download_token(
    TEXT, TEXT, TIMESTAMPTZ
) TO service_role;

COMMIT;
