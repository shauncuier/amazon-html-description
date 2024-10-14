var isVisualMode = true;

    function execCmd(command) {
        document.execCommand(command, false, null);
        updateCharCount(); // Update character counts after command execution
    }

    function toggleEditorMode() {
        var editor = document.getElementById('editor');
        if (isVisualMode) {
            editor.textContent = editor.innerHTML.trim();
            editor.setAttribute('contenteditable', false);
        } else {
            editor.innerHTML = editor.textContent.trim();
            editor.setAttribute('contenteditable', true);
        }
        isVisualMode = !isVisualMode;
        updateCharCount(); // Update character counts when toggling modes
    }

    function showHTML() {
        var editor = document.getElementById('editor');
        var editorContent = isVisualMode ? editor.innerHTML.trim() : editor.textContent.trim();
        editorContent = editorContent.replace(/<div>/g, '<p>').replace(/<\/div>/g, '</p>').replace(/<p><\/p>/g, '<br>');
        document.getElementById('html-output').textContent = editorContent;
        updateCharCount(); // Update character counts after preview
    }

    function copyHTML() {
        var editor = document.getElementById('editor');
        var editorContent = isVisualMode ? editor.innerHTML.trim() : editor.textContent.trim();
        editorContent = editorContent.replace(/<div>/g, '<p>').replace(/<\/div>/g, '</p>').replace(/<p><\/p>/g, '<br>');

        var tempTextarea = document.createElement("textarea");
        tempTextarea.value = editorContent;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextarea);
        alert("HTML copied to clipboard!");
    }

    function clearEditor() {
        document.getElementById('editor').innerHTML = '';
        document.getElementById('html-output').textContent = '';
        document.getElementById('visible-count').textContent = '0'; // Reset visible character count
        document.getElementById('html-count').textContent = '0'; // Reset HTML character count
    }

    function insertSymbol(symbol) {
        var editor = document.getElementById('editor');
        editor.focus();
        document.execCommand('insertText', false, symbol);
        updateCharCount(); // Update character counts after inserting a symbol
    }

    function updateCharCount() {
        var editor = document.getElementById('editor');
        var htmlContent = isVisualMode ? editor.innerHTML : editor.textContent;

        // Visible character count (excluding HTML tags)
        var visibleCount = htmlContent.replace(/<[^>]*>/g, '').length;

        // HTML character count (including HTML tags)
        var htmlCount = htmlContent.length;

        // Update counts in the UI
        document.getElementById('visible-count').textContent = visibleCount;
        document.getElementById('html-count').textContent = htmlCount;
    }