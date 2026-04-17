import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Cadastro() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <Card className="w-[350px] border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Cadastro</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Input placeholder="Nome" />
          <Input placeholder="Email" />
          <Input placeholder="Senha" type="password" />

          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Cadastrar
          </Button>

          <Link href="/login">
            <Button variant="outline" className="border-red-500 text-red-600 w-full">
              Já tenho conta
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}