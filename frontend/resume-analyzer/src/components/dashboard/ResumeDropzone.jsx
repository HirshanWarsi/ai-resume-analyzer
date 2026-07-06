import React, { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

function validateResumeFile(file) {
  if (!file) return "";

  const isPdf =
    file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    return "Please upload a PDF file. DOC, DOCX, TXT, ZIP, and other formats are not supported.";
  }

  if (file.size > MAX_UPLOAD_SIZE) {
    return "Please upload a PDF that is 10 MB or smaller.";
  }

  return "";
}

export default function ResumeDropzone({ onFileSelected, onValidationError }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleFiles = useCallback(
    (files) => {
      const f = files?.[0];
      if (!f) return;
      const validationError = validateResumeFile(f);

      if (validationError) {
        setFile(null);
        onFileSelected?.(null);
        onValidationError?.(validationError);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        return;
      }

      setFile(f);
      onValidationError?.("");
      onFileSelected?.(f);
    },
    [onFileSelected, onValidationError],
  );

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div className="w-full">
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload a resume file"
        onKeyDown={handleKeyDown}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed p-10 text-center transition-colors outline-none focus:ring-2 focus:ring-primary/50 sm:p-16",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-muted/40 hover:border-primary/50 hover:bg-muted/60",
        )}
      >
        {/* scanning motif */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute left-0 right-0 h-24 animate-scan-sweep bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          aria-label="Choose a resume file"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow">
                <UploadCloud className="h-7 w-7 text-white" />
                <span className="absolute inset-0 rounded-2xl border border-primary/40 animate-pulse-ring" />
              </div>
              <p className="font-display text-lg font-semibold">
                Drag & drop your resume here
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                or click to browse — PDF, DOC, DOCX up to 10MB
              </p>
              <Button type="button" className="mt-6" size="lg">
                Browse Files
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="selected"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10 text-success">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <p className="mt-4 flex items-center gap-2 font-medium">
                <FileText className="h-4 w-4 text-primary" />
                {file.name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(0)} KB · Ready to analyze
              </p>
              <button
                type="button"
                aria-label="Remove selected resume file"
                onClick={() => {
                  setFile(null);
                  onFileSelected?.(null);
                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                }}
                className="mt-4 flex items-center gap-1 text-xs font-medium text-destructive hover:underline"
              >
                <X className="h-3.5 w-3.5" /> Remove file
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
