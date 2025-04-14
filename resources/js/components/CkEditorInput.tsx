import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Undo,
    Alignment,
    CodeBlock,
    Image,
    ImageToolbar,
    ImageUpload,
    SimpleUploadAdapter,
    ImageResize,
    ImageResizeButtons,
    ImageResizeEditing,
    ImageStyle,
    ImageStyleUI,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

function App() {
    return (
        <CKEditor
            editor={ ClassicEditor }
            config={ {
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'alignment',
                        '|',
                        'undo',
                        'redo',
                        '|',
                        'codeBlock',
                        '|',
                        'imageUpload',
                    ],
                },
                plugins: [
                    Essentials,
                    Paragraph,
                    Bold,
                    Italic,
                    Undo,
                    Alignment,
                    CodeBlock,
                    Image,
                    ImageToolbar,
                    ImageUpload,
                    SimpleUploadAdapter,
                    ImageResize,
                    ImageResizeButtons,
                    ImageResizeEditing,
                    ImageStyle,
                    ImageStyleUI
                ]

            } }
        />
    );
}

export default App;
