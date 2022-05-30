import Options from "./Options";
import { useOrderDetails } from "../../context/OrderDetails";

const OrderEntry = () => {
  const [ orderDetails ] = useOrderDetails();
  return(
    <div>
      <Options type='scoops'/>
      <Options type='toppings'/>
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
    </div>
  )
}

export default OrderEntry;