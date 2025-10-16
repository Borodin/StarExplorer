declare module '*.module.css' {
  const classes: { [key: string]: string };
  export = classes;
}

declare module '*.css' {
  const content: { [key: string]: string };
  export = content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: any;
  export default content;
}
