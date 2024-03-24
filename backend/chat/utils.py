import hashlib


def generate_unique_key(user_id1, user_id2):
    user_ids = sorted([str(user_id1), str(user_id2)])
    concatenated_ids = "-".join(user_ids)

    hash_object = hashlib.sha256(concatenated_ids.encode())
    unique_key = hash_object.hexdigest()[:32]  # 例として32文字を使用

    return unique_key
