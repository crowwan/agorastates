export default function ModalContent(props) {
  console.log(props);
  return props
    ? `
  <div class="modal__contentBody">
    <div class="modal__topText modal__text">${props.text}</div>
    ${
      props.content
        ? `<${props.type} class="modal__body ${props.klass}">${props.content}</${props.type}>`
        : `<${props.type} class="modal__body ${props.klass}"></${props.type}>`
    }
  </div>
  `
    : "";
}
