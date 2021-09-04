import React, { Component } from 'react';
import marked from 'marked';
import Prism from 'prismjs';

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      markdown: event.target.value
    });
  }
   render() {
     return (
       <div>
         <div id="input">
           <h3 class="title">Editor:</h3>
           <Editor markdown={this.state.markdown} onChange={this.handleChange} />
         </div>
         <div id="output">
           <h3 class="title">Preview:</h3>
           <Preview markdown={this.state.markdown} />
         </div>
       </div>
     );
   }
}

const Editor = props => {
  return (
    <textarea id="editor"
      onChange={props.onChange}
      type="text"
      value={props.markdown}
     />
  );
}

const Preview = props => {
  return (
    <div id="preview"
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer })
      }}
     />
  );
}

const placeholder = `# Welcome to the Markdown Previewer App!
## It's made for redering your markdown
Write GitHub Flavored Markdown in the editor and you'll see the result in the Preview field.

You can use **bold** text.

Not to mention code: \`const NUMBER = 8\`

And code block:
\`\`\`
function beHappy(you) {
  if (you.happiness === false) {
    you.happiness = true;
  }
  return you.happiness;
}
\`\`\`

This is a [link](https://trollmannen8.github.io/).

Here's an image:
![image](https://trollmannen8.github.io/assets/img/about.webp "Coffee")

And a list:
- One
- Two
- Three

And finally a blockquote:
> “Life is really simple, but social media has made it complicated.”
`;


export default App;