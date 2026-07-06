def test_backend_services_import():
    from app.auth.hashing import hash_password, verify_password
    from app.services.parser_service import extract_text_from_pdf

    hashed = hash_password("Hello@123")

    assert verify_password("Hello@123", hashed)
    assert extract_text_from_pdf("missing.pdf") == ""


def test_unknown_password_hash_returns_false():
    from app.auth.hashing import verify_password

    assert verify_password("Hello@123", "not-a-valid-password-hash") is False
