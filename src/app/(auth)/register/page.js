'use client'

import {
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
  MapIcon,
  LinkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

function register() {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  function submit(e) {
    setErrorMsg(null);
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.role = "staff";

    if (data.password !== data.passwordConfirm) {
      setErrorMsg("Senhas não correspondentes");
      return;
    }

    register(data).then(console.log).catch(setErrorMsg);
  }

  return (
    <article className="flex items-center justify-center h-[100vh] relative overflow-hidden">
      <div className="absolute inset-0 bg-accent"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[300px] h-[300px] bg-[#CBAD51] opacity-30 rounded-full absolute -left-20 -bottom-20 animate-pulse"></div>
        <div className="w-[200px] h-[200px] bg-[#CBAD51] opacity-20 rounded-full absolute left-40 top-40 animate-pulse"></div>
        <div className="w-[150px] h-[150px] bg-[#CBAD51] opacity-25 rounded-full absolute right-10 bottom-10 animate-pulse"></div>
        <div className="w-[100px] h-[100px] bg-[#CBAD51] opacity-30 rounded-full absolute left-20 top-20 animate-pulse"></div>
        <div className="w-[180px] h-[180px] bg-[#CBAD51] opacity-20 rounded-full absolute right-40 bottom-40 animate-pulse"></div>
        <div className="w-[130px] h-[130px] bg-[#CBAD51] opacity-25 rounded-full absolute left-60 bottom-20 animate-pulse"></div>
        <div className="w-[90px] h-[90px] bg-[#CBAD51] opacity-30 rounded-full absolute right-60 top-10 animate-pulse"></div>
      </div>

      <form
        className="bg-slate-100 text-slate-800 border border-slate-400 rounded-lg p-6 lg:p-9 shadow-lg z-10 flex flex-col lg:flex-row w-10/12 lg:w-2/3"
        onSubmit={submit}
      >
        <section className="flex-1 flex items-center justify-center lg:border-r border-r-slate-300 lg:mr-8 lg:pr-5 mb-4 lg:mb-0">
            <Image
                src="/static/LogoSemFundo.png"
                alt="Logo FishNet"
                width={128}
                height={128}
            />
        </section>

        <section className="flex-1">
          <div className="overflow-y-scroll max-h-[67vh] lg:max-h-[80vh] pb-4">
            <h2 className="text-2xl font-semibold">Crie sua conta</h2>

            {errorMsg && (
              <p className="text-red-500 rounded-md border border-red-500 bg-red-300 flex flex-row items-center p-2 mt-2">
                <button onClick={() => setErrorMsg(null)}>
                  <XMarkIcon className="size-5 text-red-800" />
                </button>
                {errorMsg}
              </p>
            )}

            <div className="flex flex-col mt-6 gap-5">
              <div>
                <span className="flex bg-white rounded-lg items-center shadow-sm border border-slate-200">
                  <UserIcon className="size-9 py-2 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Nome completo"
                    className="flex-1 p-2 bg-transparent outline-none"
                  />
                </span>
              </div>

              <div>
                <span className="flex bg-white rounded-lg items-center shadow-sm border border-slate-200">
                  <EnvelopeIcon className="size-9 py-2 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="seuemail@dominio.com"
                    className="flex-1 p-2 bg-transparent outline-none"
                  />
                </span>
              </div>

              <div>
                <span className="flex bg-white rounded-lg items-center shadow-sm border border-slate-200">
                  <PhoneIcon className="size-9 py-2 text-gray-500" />
                  <input
                    type="text"
                    name="telefone"
                    id="telefone"
                    required
                    placeholder="(00) 00000-0000"
                    className="flex-1 p-2 bg-transparent outline-none"
                  />
                </span>
              </div>

              <div>
                <span className="flex bg-white rounded-lg items-center shadow-sm border border-slate-200">
                  <MapIcon className="size-9 py-2 text-gray-500" />
                  <input
                    type="text"
                    name="addr"
                    id="addr"
                    required
                    placeholder="Endereço"
                    className="flex-1 p-2 bg-transparent outline-none"
                  />
                </span>
              </div>

              <div>
                <span className="flex bg-white rounded-lg items-center shadow-sm border border-slate-200">
                  <MapIcon className="size-9 py-2 text-gray-500" />
                  <input
                    type="text"
                    name="city"
                    id="city"
                    required
                    placeholder="Cidade"
                    className="flex-1 p-2 bg-transparent outline-none"
                  />
                </span>
              </div>

              <div>
                <span className="flex bg-white rounded-lg items-center shadow-sm border border-slate-200">
                  <MapIcon className="size-9 py-2 text-gray-500" />
                  <input
                    type="text"
                    name="estado"
                    id="estado"
                    required
                    placeholder="Estado"
                    className="flex-1 p-2 bg-transparent outline-none"
                  />
                </span>
              </div>

              <div>
                <span className="flex bg-white rounded-lg items-center shadow-sm border border-slate-200">
                  <IdentificationIcon className="size-9 py-2 text-gray-500" />
                  <input
                    type="text"
                    name="cpf"
                    id="cpf"
                    required
                    placeholder="CPF ou CNPJ"
                    className="flex-1 p-2 bg-transparent outline-none"
                  />
                </span>
              </div>

              <div>
                <span className="flex bg-white rounded-lg items-center shadow-sm border border-slate-200">
                  <LinkIcon className="size-9 py-2 text-gray-500" />
                  <input
                    type="url"
                    name="picture"
                    id="picture"
                    required
                    placeholder="URL para foto"
                    className="flex-1 p-2 bg-transparent outline-none"
                  />
                </span>
              </div>

              <div>
                <span className="flex bg-white rounded-lg items-center shadow-sm border border-slate-200">
                  <LockClosedIcon className="size-9 py-2 text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    placeholder="Senha"
                    className="flex-1 p-2 bg-transparent outline-none"
                  />
                </span>
              </div>

              <div>
                <span className="flex bg-white rounded-lg items-center shadow-sm border border-slate-200">
                  <LockClosedIcon className="size-9 py-2 text-gray-500" />
                  <input
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    required
                    placeholder="Confirme a senha"
                    className="flex-1 p-2 bg-transparent outline-none"
                  />
                </span>
              </div>

              <a
                href="/login"
                className="text-blue-dark hover:text-yellow-light w-max"
              >
                Já tem uma conta? Faça login.
              </a>
              <button
                type="submit"
                className="bg-accent rounded-lg py-2 shadow-sm text-white"
              >
                Criar Conta
              </button>
            </div>
          </div>
        </section>
      </form>
    </article>
  );
}

export default register;