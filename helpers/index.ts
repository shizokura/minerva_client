import { format } from 'date-fns'
export const FormattedPrice = ( price: number) => {
    const formattedPrice = Intl.NumberFormat("fil-PH", {
      style: "currency",
      currency: "PHP"
    }).format(price);

    const updatedPrice = formattedPrice.replace("₱", "PHP ");

    return updatedPrice
  }


export const FormattedDate = (date: any) => {
  return format(new Date(date), "dd MMM yyyy");
}




export const dateFunctions = (dates: any) => {
  
  return  format(new Date(dates ? dates : new Date()), "yyyy-MM-dd").replaceAll('"', "")

}

