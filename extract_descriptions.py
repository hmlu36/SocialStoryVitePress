import os
import re
import string

def extract_metadata(directory):
    metadata_list = []
    for filename in os.listdir(directory):
        if filename.endswith(".md"):
            with open(os.path.join(directory, filename), 'r', encoding='utf-8') as file:
                lines = file.readlines()
                metadata = {}
                for line in lines:
                    if line.startswith("title"):
                        metadata['title'] = line.split('=')[1].strip().strip('"')
                    elif line.startswith("description"):
                        metadata['description'] = line.split('=')[1].strip().strip('"')
                    elif line.startswith("path"):
                        metadata['path'] = line.split('=')[1].strip().strip('"')
                if 'title' in metadata and 'description' in metadata and 'path' in metadata:
                    metadata_list.append(metadata)
    return metadata_list

def sanitize_filename(text):
    return text.translate(str.maketrans('', '', string.punctuation))

def create_new_files(directory, metadata_list):
    for metadata in metadata_list:
        sanitized_title = sanitize_filename(metadata['title'])
        sanitized_description = sanitize_filename(metadata['description'])
        new_filename = f"{sanitized_title}_{sanitized_description}.md"
        new_filepath = os.path.join(directory, new_filename)
        with open(new_filepath, 'w', encoding='utf-8') as new_file:
            new_file.write(f'<Story jsonPath="{metadata["path"]}" />\n')

if __name__ == "__main__":
    directory = "./posts"
    metadata_list = extract_metadata(directory)
    create_new_files(directory, metadata_list)