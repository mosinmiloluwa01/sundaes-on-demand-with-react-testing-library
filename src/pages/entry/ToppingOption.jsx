import Col from "react-bootstrap/Col";
import { pricePerItem } from "../../constants";

const ToppingOption = ({name, imagePath, updateItemCount, type}) => {
  const handleChange = (event) => {
    let count = event.target.checked ? 1 : 0
    // console.log('count in toppings>>>', count, event.target.checked)
    updateItemCount(name, count, type)
  }
  return(
  <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: 'center'}}>
    <img style={{width: '75%'}} src={`http://localhost:3030/${imagePath}}`} alt={`${name} toppings`} />
    <div>
    <input 
      aria-label={name}
      type="checkbox" 
      onChange={handleChange}
      />
      <label>{name}</label>
    </div>
  </Col>
  )
}

export default ToppingOption