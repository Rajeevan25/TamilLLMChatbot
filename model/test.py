from transformers import AutoTokenizer, AutoModelForQuestionAnswering

model_name = "RajeevanL/tamil-qa-distilled-XLMRoberta-v2"  # or your desired model

# Download and cache
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForQuestionAnswering.from_pretrained(model_name)

# Save locally
model.save_pretrained("my_model")
tokenizer.save_pretrained("my_model")

print("Model downloaded and saved locally to ./my_model")
