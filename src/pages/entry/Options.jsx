import { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import { Alert, Row } from "react-bootstrap";
import AlertBanner from "../common/AlertBanner";
import {pricePerItem} from '../../constants';
import {useOrderDetails} from '../../context/OrderDetails';

const Options = ({type}) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios.get(`http://localhost:3030/${type}`)
    .then(response => setItems(response.data))
    .catch(error => setError(true))
  }, [type])

  if(error) {
    return(<AlertBanner />)
  }

  const ItemComponent = type === 'scoops' ? ScoopOption : ToppingOption;
  //take first letter to uppercase and take from the second index till the end tolowercase
  const title = type[0].toUpperCase() + type.slice(1).toLowerCase()

  const optionItems = items.map(item => (
    <ItemComponent 
    key={item.name} 
    name={item.name} 
    imagePath={item.imagePath}
    type={type}
    updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, type)}
    />
    ))
    
  return(
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[type]} each</p>
      <p>{title} total: {orderDetails.totals[type]}</p>
      <Row>{optionItems}</Row>
    </>
  );
}

export default Options