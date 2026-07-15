import { useCallback, useSyncExternalStore } from "react";

export type ToastVariant = "default" | "destructive";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  createdAt: number;
}

export interface ToastOptions {
  description?: string;
  variant?: ToastVariant;
}

export type ToastInput =
  | string
  | {
      title: string;
      description?: string;
      variant?: ToastVariant;
    };

const isDev =
  typeof process !== "undefined" &&
  typeof process.env !== "undefined" &&
  process.env.NODE_ENV !== "production";

let toasts: Toast[] = [];
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Toast[] {
  return toasts.length === 0 ? emptyToasts : toasts;
}

const emptyToasts: Toast[] = []

function getServerSnapshot() {
  return emptyToasts
}

function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function logToast(toast: Toast): void {
  if (!isDev) return;

  if (toast.variant === "destructive") {
    console.error(`[toast][destructive] ${toast.title}`, toast.description ?? "");
  } else {
    console.log(`[toast][default] ${toast.title}`, toast.description ?? "");
  }
}

export function addToast(input: ToastInput): string {
  const normalized: Toast =
    typeof input === "string"
      ? {
          id: createId(),
          title: input,
          description: undefined,
          variant: "default",
          createdAt: Date.now(),
        }
      : {
          id: createId(),
          title: input.title,
          description: input.description,
          variant: input.variant ?? "default",
          createdAt: Date.now(),
        };

  toasts = [...toasts, normalized];
  logToast(normalized);
  emit();
  return normalized.id;
}

export function dismissToast(id: string): void {
  if (!toasts.some((toast) => toast.id === id)) return;
  toasts = toasts.filter((toast) => toast.id !== id);
  emit();
}

export function clearToasts(): void {
  if (toasts.length === 0) return;
  toasts = [];
  emit();
}

export interface UseToastReturn {
  toasts: Toast[];
  toast: (title: string, description?: string, variant?: ToastVariant) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

export function useToast(): UseToastReturn {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toast = useCallback(
    (title: string, description?: string, variant?: ToastVariant): string => {
      return addToast({ title, description, variant });
    },
    []
  );

  const dismiss = useCallback((id: string): void => {
    dismissToast(id);
  }, []);

  const clear = useCallback((): void => {
    clearToasts();
  }, []);

  return {
    toasts: snapshot,
    toast,
    dismiss,
    clear,
  };
}

export default useToast;
