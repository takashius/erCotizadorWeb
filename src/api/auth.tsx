import { Register, useMutation, useQuery, UseQueryResult, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import ERDEAxios from "./ERDEAxios"
import { Account, LoginResponse } from "../types"

export interface UserLogin {
  name: string;
  lastName: string;
  email: string;
  token: string;
  _id: string;
}

export interface Recovery {
  code: Number;
  email: string;
  newPass: string;
}

export interface SetCompany {
  user: string;
  company: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Image {
  image: any,
  imageType: string
}

export const useLogin = (): UseMutationResult<LoginResponse, unknown, Login> => {
  return useMutation<LoginResponse, unknown, Login>({
    mutationFn: (data: Login) => {
      return ERDEAxios.post("/user/login", data)
    }
  })
}

export const useAccount = (): UseQueryResult<Account, Error> => {
  return useQuery<Account, Error>({
    queryKey: ["myAccount"],
    retry: false,
    queryFn: () => {
      return ERDEAxios.get<Account>("/user/account").then(response => response.data)
    },
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: (any: any) => {
      console.log(any)
      return ERDEAxios.post("/user/logout")
    },
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: Register) => {
      return ERDEAxios.post("/user/register", data)
    }
  })
}

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (data: Account) => {
      return ERDEAxios.patch("/user/profile", data)
    }
  })
}

export const useSelectCompany = () => {
  return useMutation({
    mutationFn: (data: SetCompany) => {
      return ERDEAxios.patch("/user/select_company", data)
    }
  })
}

export const useRecoveryOne = () => {
  return useMutation({
    mutationFn: (email: String) => {
      return ERDEAxios.get("/user/recovery/" + email)
    }
  })
}

export const useRecoveryTwo = () => {
  return useMutation({
    mutationFn: (data: Recovery) => {
      return ERDEAxios.post("/user/recovery", data)
    }
  })
}

export const useUploadImage = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: Image) => {
      localStorage.setItem('contentType', 'true')
      var formData = new FormData()
      formData.append("image", data.image)
      formData.append("imageType", data.imageType)
      return ERDEAxios.post("/user/upload", formData)
    },
    onSuccess: () => {
      localStorage.removeItem('contentType')
      queryClient.invalidateQueries({ queryKey: ['myAccount'] })
    },
    onError: (error) => {
      console.log('error useUploadImage', error)
      localStorage.removeItem('contentType')
    }
  })

  return mutation;
}

export const useUploadBanner = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: Image) => {
      localStorage.setItem('contentType', 'true')
      var formData = new FormData()
      formData.append("image", data.image)
      formData.append("imageType", data.imageType)
      return ERDEAxios.post("/user/uploadBanner", formData)
    },
    onSuccess: () => {
      localStorage.removeItem('contentType')
      queryClient.invalidateQueries({ queryKey: ['myAccount'] })
    },
    onError: (error) => {
      console.log('error useUploadBanner', error)
      localStorage.removeItem('contentType')
    }
  });

  return mutation
}