import { twMerge } from "tailwind-merge"

interface Props {
    amount: number | string,
    className?: string
}

const FormattedPrice = ({ amount, className }: Props) => {
    const priceFormatter = new Number(amount).toLocaleString('en-US', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 2,
    })
    return (
        <span className={twMerge('text-lg font-semibold', className)}>
            {priceFormatter}
        </span>
    )
}

export default FormattedPrice
