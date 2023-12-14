class DragAndDropHandler {
    constructor(playerFont) {
      this.playerFont = playerFont;
      this.dropZone = null;
      this.fileInput = null;
      this.setupDropZone();
    }
  
    createDropZone() {
      // create the drop zone div
      this.dropZone = document.createElement('div');
      this.dropZone.className = 'drop-zone';
      this.dropZone.id = 'dropZone';
  
      // create the drop zone text 
      const promptSpan = document.createElement('span');
      promptSpan.className = 'drop-zone__prompt';
      promptSpan.textContent = 'Drop image here or click to upload';
  
      // create the file input element 
      this.fileInput = document.createElement('input');
      this.fileInput.type = 'file';
      this.fileInput.name = 'myFile';
      this.fileInput.className = 'drop-zone__input';
      this.fileInput.id = 'fileInput';
      this.fileInput.addEventListener('change', this.handleFile.bind(this));
  
      this.dropZone.appendChild(promptSpan);
      this.dropZone.appendChild(this.fileInput);
      document.body.appendChild(this.dropZone);
    }
  
    // handle the file input change and update the thumbnail
    handleFile() {
      const selectedFile = this.fileInput.files[0];
      this.updateThumbnail(selectedFile);
    }
  
    // update the thumbnail container with the selected file
    updateThumbnail(file) {
      let thumbnailElement = this.dropZone.querySelector('.drop-zone__thumb');
    
      // first time - remove the prompt
      if (this.dropZone.querySelector('.drop-zone__prompt'))
        this.dropZone.querySelector('.drop-zone__prompt').remove();
      
      // remove any existing incorrect file type message
      let incorrectFileType = this.dropZone.querySelector('.incorrect-file-type');
      if (incorrectFileType) {
        incorrectFileType.remove();
      }

      // creation of the thumbnail if it doesn't exist
      if (!thumbnailElement) {
        thumbnailElement = document.createElement('div');
        thumbnailElement.classList.add('drop-zone__thumb');
        dropZone.appendChild(thumbnailElement);
      }
    
      thumbnailElement.dataset.label = file.name;
  
      // show thumbnail for image files
      if (file.type.startsWith('image/')) {
        // delete the "incorrect file type" message if it exists
        let incorrectFileType = document.querySelector('.incorrect-file-type');
        if (incorrectFileType)
          incorrectFileType.remove();

        const reader = new FileReader();
    
        reader.readAsDataURL(file);
        reader.onload = () => {
          thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
          this.playerFont.src = reader.result;
        };
      } else {
        // add an "incorrect file type" message in case the user tries to upload a file that is not an image
        let incorrectFileType = document.createElement('div');
        incorrectFileType.classList.add('incorrect-file-type');
        incorrectFileType.innerHTML = 'Incorrect file type';
        dropZone.appendChild(incorrectFileType);
        thumbnailElement.remove();
      }
    }
  
    // setup the event listeners for the drop zone
    setupDropZone() {
      this.createDropZone();
  
      this.dropZone.addEventListener('click', (e) => {
        this.fileInput.click();
      });
  
      this.fileInput.addEventListener('change', this.handleFile.bind(this));
  
      this.dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        this.dropZone.classList.add('drop-zone--over');
      });
  
      ['dragleave', 'dragend'].forEach((type) => {
        this.dropZone.addEventListener(type, (e) => {
          this.dropZone.classList.remove('drop-zone--over');
        });
      });
  
      this.dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
  
        if (e.dataTransfer.files.length) {
          this.fileInput.files = e.dataTransfer.files;
          this.updateThumbnail(e.dataTransfer.files[0]);
        }
  
        this.dropZone.classList.remove('drop-zone--over');
      });
    }

    // add the styles for the drop zone
    addStyles() {
      const styleElement = document.createElement('style');
      styleElement.textContent = `
      .drop-zone {
        width: 200px;
        height: 200px;
        padding: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-family: "Quicksand", sans-serif;
        font-weight: 500;
        font-size: 30px;
        cursor: pointer;
        color: #fcfcfc;
        border: 4px dashed #a26eea;
        text-shadow: 0 0 5px #a26eea, 0 0 10px #a26eea, 0 0 20px #a26eea;
        border-radius: 10px;
        position: absolute;
      }

      .drop-zone--over {
        border-style: solid;
        
      }

      .drop-zone__input {
        display: none;
      }

      .drop-zone__thumb {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        background-size: cover;
        position: relative;
      }

      .drop-zone__thumb::after {
        content: attr(data-label);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 5px 0;
        color: #ffffff;
        background: rgba(0, 0, 0, 0.75);
        font-size: 14px;
        text-align: center;
      }
      `;

      // add the styles to the head of the document
      document.head.appendChild(styleElement);
    }
  }
  
  export default DragAndDropHandler;