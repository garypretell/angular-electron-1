import { FormGroup } from '@angular/forms';

export const isEmptyValue = (val: any): boolean => {
  if (val === undefined || val === '' || val === null) {
    return true;
  } else {
    return false;
  }
};

export const downloadFileFromUrl = (url: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = url.substr(url.lastIndexOf('/') + 1);
  link.click();
};

export const downloadBase64 = (
  data: string,
  name: string,
  type: string
): void => {
  const linkSource = `data:${type};base64,${data}`;
  const downloadLink = document.createElement('a');
  const fileName = `${name}`;
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};


export const formatBytes = (bytes, decimals): any => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = decimals <= 0 ? 0 : decimals || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const b64toBlob = (dataURI, type) => {
  const byteString = atob(dataURI.replace(/\s/g, ''));
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type });
};


export function verifyPercentage(percentage: number): boolean {
  return percentage > 0 && percentage <= 100 ? true : false;
}

export const downloadBase64Async = async (
  data: string,
  name: string,
  type: string
) => {
  const base64Response = await fetch(`data:${type};base64,${data}`);
  const blob = await base64Response.blob();

  const downloadLink = document.createElement('a');
  const fileName = `${name}`;
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = fileName;
  downloadLink.click();
};

export const markFormGroupTouched = (formGroup: FormGroup) => {
  (Object as any).values(formGroup.controls).forEach((control) => {
    control.markAsTouched();
    if (control.controls) {
      markFormGroupTouched(control);
    }
  });
};
