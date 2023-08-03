// This function executes the Cipher algorithm based on user input
function main() {
    // Get the input text and key from the user interface
    const input = document.getElementById("in").value;
    const key = parseInt(document.getElementById("key").value);
    const type = document.getElementById("Gtype").value;
    let output = "";

    // Helper function to check if a character is a letter
    function isLetter(c) {
        return c.toLowerCase() !== c.toUpperCase();
    }

    // Cipher Encryption Function
    function C_Encrypt(key, text) {
        // Define the alphabet as an array of characters for better performance
        const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        let out = "";
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (isLetter(char)) {
                // Find the index of the character in the alphabet
                const charIndex = alpha.indexOf(char);
                // Calculate the encrypted index using the key
                const encryptedIndex = (charIndex + key) % 52;
                // Append the encrypted character to the output
                out += alpha[encryptedIndex];
            } else {
                // Non-letter characters remain unchanged
                out += char;
            }
        }
        return out;
    }

    // Cipher Decryption Function
    function C_Decrypt(key, text) {
        // Define the alphabet as an array of characters for better performance
        const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        let out = "";
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (isLetter(char)) {
                // Find the index of the character in the alphabet
                const charIndex = alpha.indexOf(char);
                // Calculate the decrypted index using the key
                let decryptedIndex = (charIndex - key) % 52;
                // Handle negative indices by shifting back to the end of the alphabet
                if (decryptedIndex < 0) {
                    decryptedIndex += 52;
                }
                // Append the decrypted character to the output
                out += alpha[decryptedIndex];
            } else {
                // Non-letter characters remain unchanged
                out += char;
            }
        }
        return out;
    }

    // Check the type of action selected (Encryption or Decryption) and perform the appropriate operation
    if (type == 1) {
        // Encrypt the input text twice with the same key for additional security
        output = C_Encrypt(key, input);
        output = C_Encrypt(key, output);
    } else if (type == 2) {
        // Decrypt the input text twice with the same key to reverse the encryption
        output = C_Decrypt(key, input);
        output = C_Decrypt(key, output);
    }

    // Update the output text in the user interface
    document.getElementById("out").innerHTML = output;
}

// Function To Save File Using Third Party Library (Filesaver.js)
function saveDynamicDataToFile() {
    // Get the encrypted/decrypted output text
    const userInput = document.getElementById("out").value;
    // Create a Blob from the output text with the appropriate MIME type
    const blob = new Blob([userInput], { type: "text/plain;charset=utf-8" });
    // Save the Blob as a .txt file using the saveAs function from the FileSaver.js library
    saveAs(blob, "GM3 Cipher.txt");
}

// This function handles file uploads and updates the input text with the file content
document.getElementById('inputfile').addEventListener('change', function() {
    // Create a FileReader to read the uploaded file
    const fr = new FileReader();
    // When the file is loaded, update the input text with its content
    fr.onload = function() {
        document.getElementById('in').textContent = fr.result;
    };
    // Read the uploaded file as text
    fr.readAsText(this.files[0]);
});
