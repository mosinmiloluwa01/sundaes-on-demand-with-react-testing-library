import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'

const ScoopOption = ({name, imagePath, updateItemCount, type}) => {
  const handleChange = (event) => {
    updateItemCount(name, event.target.value, type)
  }
  return(
  <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: 'center'}}>
    <img style={{width: '75%'}} src={`http://localhost:3030/${imagePath}}`} alt={`${name} scoop`} />

    <Form.Group controlId={`${name}-count`} as={Row} style={{marginTop: '10px'}}>
      <label>{name}</label>
      {/* <Form.label column xs="6" style={{textAlign: 'right'}}>{name}</Form.label> */}
      <Form.Control
      aria-label={name} 
      xs="5" 
      style={{textAlign: 'left'}} 
      type="number" 
      defaultValue={0}
      onChange={handleChange}
      ></Form.Control>
    </Form.Group>
  </Col>
  )
}

export default ScoopOption;