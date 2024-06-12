import { InputHTMLAttributes } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {

}

const Input = ({ className, ...props }: Props) => {
  return (
    <input
      className={`border px-2 rounded-md border-grey-50 ${className}`}
      {...props}
    />
  )
}

export default Input