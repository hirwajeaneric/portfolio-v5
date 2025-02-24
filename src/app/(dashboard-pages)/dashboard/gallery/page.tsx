import { Button } from "@/components/ui/button";
import DashboardPageContainer from "@/components/widgets/DashboardPageContainer";
import DashboardPageHeader from "@/components/widgets/DashboardPageHeader";
import Link from "next/link";

export default function page() {
  return (
    <DashboardPageContainer>
      <DashboardPageHeader 
        title="Gallery" 
        description=""
        button={<Link href="/dashboard/blog/new"><Button>Upload New Asset</Button></Link>}
      />
      
    </DashboardPageContainer>
  )
}
