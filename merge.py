feature_name = input("Entrez le nom de la feature : ").strip()

print(f"git push -u origin {feature_name}\ngit checkout dev\ngit merge {feature_name}\ngit push origin dev\ngit branch -d {feature_name}\ngit push origin --delete {feature_name}")
