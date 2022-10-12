function openInNewTab(href) {
  Object.assign(document.createElement("a"), {
    //   target: "_blank",
    rel: "noopener noreferrer",
    href: href,
  }).click();
}

export default openInNewTab;
