import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
  params
}:{
  children:React.ReactNode;
  params: {practiceId:string}
}){

  const { userId, } = auth();

  if(!userId){
    redirect('/sign-in')
  }


  
  const practice = await prismadb.practice.findFirst({
    where:{
      id: params.practiceId,
      userId
    }
  });


  if(!practice){
    redirect('/')
  }
 

  return(
    <div className="flex w-full">
      <Navbar name={practice.name}/>
      {children}
    </div>
  )

}