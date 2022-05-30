import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
}

const OrderDetails = createContext();

//check whether we are inside a provider
export const useOrderDetails = () => {
  const context = useContext(OrderDetails)

  if(!context) {
    throw new Error('must be used within an OrderDetailsProvider')
  }
  return context
}

export const OrderDetailsProvider = (props) => {
  //state for counts
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map()
  });
  
  const zeroCurrency = formatCurrency(0);
  //state for toals
  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0
  })


  const calculateSubtotal = (type, optionCounts) => {
    let optionCount = 0;
    for(const count of optionCounts[type].values()) {
      //for everytime its called it calculates total for that type eg toppings
      optionCount +=count
    }
    return optionCount * pricePerItem[type];
  }

  //check when optionCounts changes to update stuff
  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts)
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts)
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    //set totals when there is a change in optionCounts
    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal: grandTotal
    })
  }, [optionCounts])

  //useMemo is used to prevent state recalculation when its not needed i.e only when optionCounts or totals change
  const value = useMemo(() => {
    const updateItemCount = (name, newCount, type) => {
      // make copy of optionCount state cos of modification
      const newOptionCounts = { ...optionCounts }
      // copy state for a particular type eg toppings into a variable for manipulation
      const optionCountsMap = optionCounts[type];
      // set value for the particular key name in state copy, it always overwrites existing values
      optionCountsMap.set(name, parseInt(newCount))
      setOptionCounts(newOptionCounts)
    }
    return [{...optionCounts, totals}, updateItemCount]
  },[optionCounts, totals])

  return <OrderDetails.Provider value={value} {...props} />
}