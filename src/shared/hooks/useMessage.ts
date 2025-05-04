import { ToastPosition, useToast } from '@chakra-ui/react';

type TToastConfig = {
  title: string;
  description: string;
  status: 'success' | 'info' | 'warning' | 'error' | 'loading';
  position: ToastPosition;
  duration: number;
  statusCode?: number;
};

export const useMessage = () => {
  const toastPosition: ToastPosition = 'top-right';
  const toast = useToast();

  const successToast = (config?: Partial<TToastConfig>) => {
    toast({
      title: config?.title ?? 'Məlumat!',
      description: config?.description ?? 'Proses uğurla başa çatdı!',
      status: 'success',
      position: config?.position ?? toastPosition,
      duration: config?.duration ?? 3000,
      isClosable: true
    });
  };
  const errorToast = (config?: Partial<TToastConfig>) => {
    toast({
      title: config?.title ?? 'Error!',
      description: config?.description ?? 'Please enter a GitHub username!',
      status: 'error',
      position: config?.position ?? toastPosition,
      duration: config?.duration ?? 4000,
      isClosable: true
    });
  };

  const warningToast = (config?: Partial<TToastConfig>) => {
    toast({
      title: config?.title ?? 'Məlumat!',
      description: config?.description ?? 'Məlumat!',
      status: 'warning',
      position: config?.position ?? toastPosition,
      duration: config?.duration ?? 4000,
      isClosable: true
    });
  };

  return {
    errorToast,
    successToast,
    warningToast
  };
};
