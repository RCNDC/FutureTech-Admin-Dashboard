import { useAuth } from "@/components/authprovider";
import { localcompanycolumns } from "@/components/tablecolumns/localcompanycolumns";
import SubmissionDetail from "@/components/submissiondisplay";
import axiosInstance from "@/lib/axiosinstance";
import type { response } from "@/types/response";
import type { SubmissionResponse } from "@/types/submission";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { MetaArgs } from "react-router";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Loading from "@/components/loading";
import exportToExcel from "@/hooks/useExport";

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
    queryKey: ["submissions", "localcompany"],
    queryFn: async () => {
      const res = await axiosInstance.get<response<SubmissionResponse[]>>(
        "/register/submission/localcompany",
      );
      return res.data;
    },
  });

  const canAddCompany = user?.role === 1 || user?.role === 3;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Local Company Profiles
        </h1>
        {canAddCompany && <AddCompanyDialog type="local" />}
      </div>

      <SubmissionDetail
        columns={localcompanycolumns}
        data={data?.data}
        isLoading={isLoading}
        name="Local Company Submissions"
        exportEndPoint="localcompanies"
        type="localcompany"
      />
    </div>
  );
};

export default Index;
