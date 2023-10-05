import json
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

with open('./vocabulary.txt','r') as file:
    words = file.read()

words = words.split('\n')

embeddings = model.encode(words)

print(len(words), embeddings.shape)
vocab = list(zip(words, embeddings.tolist()))

with open('./embeddings.json', 'w') as file:
    json.dump(vocab, file, indent=4)
