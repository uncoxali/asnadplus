import './index.scss'
export default function Fieldset({title=''}) {
  return (
    <div className="Fieldset border-top border-dark mt-4">
      <label className="title bg-white text-center mx-auto d-block px-2">
        {title}
      </label>
    </div>
  );
}
