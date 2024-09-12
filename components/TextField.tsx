interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMsg?: string
  label: string
}

const TextField = ({ label, errorMsg, ...props }: TextFieldProps) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 transition duration-200 mt-2"
        placeholder="Type here"
      />
      {errorMsg && <span className="text-red-500 text-sm">{errorMsg}</span>}
    </div>
  )
}

export default TextField
