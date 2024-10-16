import { useState } from "react"
import { InputCheckbox } from "../InputCheckbox"
import { TransactionPaneComponent } from "./types"
import mockData from "../../mock-data.json"
import { useCustomFetch } from "src/hooks/useCustomFetch"
export const TransactionPane: TransactionPaneComponent = ({
  transaction,
  loading,
  setTransactionApproval: consumerSetTransactionApproval
}) => {
  const [approved, setApproved] = useState(transaction.approved)
  const { clearCache } = useCustomFetch()
  // const handleApprovalChange = (newValue: boolean) => {
  //   const updatedTransactionIndex = mockData.transactions.findIndex(
  //     (t) => t.id === transaction.id
  //   )

  //   if (updatedTransactionIndex !== -1) {
  //     mockData.transactions[updatedTransactionIndex].approved = newValue
  //     setApproved(newValue)
  //     if (setTransactionApproval) {
  //       setTransactionApproval({
  //         transactionId: transaction.id,
  //         newValue: newValue,
  //       });
  //     }
  //   }
  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox
        id={transaction.id}
        checked={approved}
        disabled={loading}
        onChange={async (newValue) => {
          await consumerSetTransactionApproval({
            transactionId: transaction.id,
            newValue,
          })
          await clearCache() 
          setApproved(newValue)
        }}

      />
    </div>
  )
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
