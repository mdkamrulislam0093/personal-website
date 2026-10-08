import { site } from '../content';
import './Marquee.css';

function Row() {
  return (
    <span>
      {site.marquee.map((word, i) => (
        <span key={word} className="marquee__item">
          {i % 2 ? <em>{word}</em> : word}
          <i className="marquee__star">✺</i>
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      {/* Two identical rows so the -50% loop is seamless. */}
      <div className="marquee__track">
        <Row />
        <Row />
      </div>
    </div>
  );
}
