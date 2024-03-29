import showdown from "showdown";

const converter = new showdown.Converter({
  tables: true,
  tasklists: true,
  strikethrough: true,
  simplifiedAutoLink: true,
  openLinksInNewWindow: true,
});

const mdToHtml = (value: string): string => {
  return converter.makeHtml(value);
};

export { mdToHtml };
