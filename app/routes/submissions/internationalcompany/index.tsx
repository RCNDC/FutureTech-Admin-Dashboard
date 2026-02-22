import { useAuth } from "@/components/authprovider";
import { columns } from "@/components/tablecolumns/submissioncolumns";
import SubmissionDetail from "@/components/submissiondisplay";
import axiosInstance from "@/lib/axiosinstance";
import type { response } from "@/types/response";
import type { SubmissionResponse } from "@/types/submission";
import { useQuery } from "@tanstack/react-query";
import type { MetaArgs } from "react-router";

export function meta({}: MetaArgs) {
  return [
    { title: "Registration Submissions - Future tech addis" },
    { name: "description", content: "Form submissions" },
  ];
}

import { AddCompanyDialog } from "@/components/addCompanyDialog";
import { useUserStore } from "store/userstore";

const Index = () => {
  const auth = useAuth();
  const { user } = useUserStore();
  const { data, isLoading } = useQuery({
    queryKey: ["submissions", "internationalcompany"],
    queryFn: async () => {
      const res = await axiosInstance.get<response<SubmissionResponse[]>>(
        "/register/submission/internationalcompany",
      );
      return res.data;
    },
  });

  const canAddCompany = user?.role === 1 || user?.role === 3;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          International Company Profiles
        </h1>
        {canAddCompany && <AddCompanyDialog type="international" />}
      </div>

      <SubmissionDetail
        columns={columns}
        data={data?.data}
        isLoading={isLoading}
        name="International Company Submissions"
        exportEndPoint="internationalcompanies"
        type="internationalcompany"
      />
    </div>
  );
};

export default Index;
