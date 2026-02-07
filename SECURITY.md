# Security system

### Authentication
We store session as UUID in a cookie.
The user DB stores a hashed and salted version of the password, everything check server-side.

### API keys
We have two API keys per user, one with read-only access and one with write access.

### Data storage
Both courses and textbooks have a symmetric DEK key. The raw DEK is encrypted with the author's (or publisher's or school's) public key and stored in the database. The ciphertext is decrypted with the author's (or publisher's or school's) private key when the course or textbook is accessed. The raw DEK is not stored in the database.

When sharing to another user, the user's DEK is decrytped and then re-encrypted with the recipient's public key, and stored in the database. The recipient can then decrypt the DEK with their private key when they access the course or textbook.

### Data security
All PII data is encrypted with the user's private key, derived on the client from their password (unhashed).

The DB admininistator cannot access any data - PII included.

### Password reset
We encrypt the user's private key (derived from their password) with a symmetrical random key, and store the ciphertext in the database. The random key is securely stored in a **Cloudflare secret** (not in the DB). When the user requests a password reset, we re-encrypt all of their data with a new private key (since we can decrypt their private key with the random key).

### Commercial transactions
TODO