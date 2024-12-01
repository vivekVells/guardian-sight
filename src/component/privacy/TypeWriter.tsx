import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownTypewriter = ({
  content,
  speed = 20,
  step = 25,
  cursorHideDelay = 300,
}: {
  content: string;
  speed?: number;
  step?: number;
  cursorHideDelay?: number;
}) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setIsTypingComplete(false);
    setDisplayedContent("");
    setShowCursor(true);

    let index = 0;
    const interval = setInterval(() => {
      if (index < content.length) {
        setDisplayedContent(
          (prev) => prev + content.slice(index, index + step)
        );
        index += step;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [content, speed, step]);

  useEffect(() => {
    if (isTypingComplete) {
      const timeout = setTimeout(() => setShowCursor(false), cursorHideDelay);
      return () => clearTimeout(timeout);
    }
  }, [isTypingComplete, cursorHideDelay]);

  return (
    <div>
      <Markdown remarkPlugins={[remarkGfm]}>{displayedContent}</Markdown>
      {showCursor && <span className="cursor">|</span>}
    </div>
  );
};

export default MarkdownTypewriter;
