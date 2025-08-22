import type ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export interface CKEditorWrapper {
  editor: ClassicEditor;
  getData(): string;
  getDataAsText(): string;
  destroy(): void;
}

/**
 * Creates and initializes CKEditor in the specified element
 */
export async function createCKEditor(element: HTMLElement): Promise<CKEditorWrapper> {
  try {
    // Try to use global ClassicEditor first (from CDN)
    let ClassicEditor: any;
    
    if (typeof window !== 'undefined' && (window as any).ClassicEditor) {
      ClassicEditor = (window as any).ClassicEditor;
      console.log('Using global ClassicEditor from CDN');
    } else {
      // Fallback to dynamic import for bundler environments
      const imported = await import('@ckeditor/ckeditor5-build-classic');
      ClassicEditor = imported.default;
      console.log('Using imported ClassicEditor');
    }
    
    const editor = await ClassicEditor.create(element, {
      toolbar: [
        'undo',
        'redo',
        '|',
        'heading',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'code',
        'removeFormat',
        '|',
        'horizontalLine',
        'link',
        'bookmark',
        'insertTable',
        'highlight',
        'blockQuote',
        'codeBlock',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        'outdent',
        'indent',
      ],
      placeholder: 'Type your message here...',
      removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload'],
      height: '300px',
    });

    return {
      editor,
      getData(): string {
        return editor.getData();
      },
      getDataAsText(): string {
        return editor.getData().replace(/<[^>]*>/g, '').trim();
      },
      destroy(): void {
        editor.destroy();
      }
    };
  } catch (error) {
    console.error('Failed to initialize CKEditor:', error);
    throw new Error('Failed to initialize rich text editor. Please check your browser compatibility.');
  }
}
