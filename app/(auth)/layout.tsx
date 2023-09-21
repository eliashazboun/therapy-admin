export default function AuthLayout({
  children
}:{
  children:React.ReactNode
}){
  return(
    <div className="text-center flex items-center justify-center h-full w-full">
      {children}
    </div>
  )
}