import React from 'react';

export default function SplitText({ content }) {
  return content.split('\n').map((text, index) => {
    return (
      <span key={`${index}`}>
        {text}
        <br />
      </span>
    );
  });
}
