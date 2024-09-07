"use client";

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ClearIcon from "@mui/icons-material/Clear";

type WordCount = {
  [key: string]: number;
};

export function ContadorRepeticiones() {
  const [text, setText] = useState("");
  const [searchWords, setSearchWords] = useState("");
  const [highlightedText, setHighlightedText] = useState("");
  const [wordCount, setWordCount] = useState<WordCount>({});
  const [notFoundWords, setNotFoundWords] = useState<string[]>([]);

  const searchAndHighlight = () => {
    if (!searchWords.trim() || !text.trim()) {
      alert("Por favor, ingrese texto y palabras para buscar.");
      return;
    }

    const wordsToSearch = searchWords
      .toLowerCase()
      .split(",")
      .map((word) => word.trim())
      .filter(Boolean);
    const newWordCount: WordCount = {};
    let newHighlightedText = text;
    const notFound: string[] = [];

    wordsToSearch.forEach((word) => {
      const regex = new RegExp(`${word}`, "gi");
      let count = 0;
      newHighlightedText = newHighlightedText.replace(regex, (match) => {
        count++;
        return `<span style="background-color: #b2f5d8; color: black; padding: 1px 2px; border-radius: 50%; font-weight: bold; text-decoration: underline;">${match}</span>`;
      });
      if (count > 0) {
        newWordCount[word] = count;
      } else {
        notFound.push(word);
      }
    });

    setHighlightedText(newHighlightedText);
    setWordCount(newWordCount);
    setNotFoundWords(notFound);
  };

  const clearAll = () => {
    setText("");
    setSearchWords("");
    setHighlightedText("");
    setWordCount({});
    setNotFoundWords([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchAndHighlight();
    }
  };

  const clearText = () => setText("");
  const clearSearchWords = () => setSearchWords("");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-800 -tracking-normal font-light">
            Contador de Repeticiones
          </CardTitle>
          <CardDescription className="text-center text-lg text-gray-600 dark:text-gray-400">
            <strong>
              Introduce un texto y las palabras que deseas buscar,{" "}
              <span className="underline">separadas por comas</span>.{" "}
            </strong>
            La aplicación resaltará y contará las palabras especificadas 💥
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Ingresa tu texto aquí..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-40 dark:bg-gray-700 dark:text-white"
            />
            {text && (
              <ClearIcon
                onClick={clearText}
                className="absolute top-2 right-2 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform transform hover:scale-110"
                style={{ fontSize: "1.5rem" }}
              />
            )}
          </div>
          <div className="relative">
            <Input
              placeholder="Ingresa las palabras a buscar (separadas por comas)"
              value={searchWords}
              onChange={(e) => setSearchWords(e.target.value)}
              onKeyDown={handleKeyDown}
              className="dark:bg-gray-700 dark:text-white"
            />
            {searchWords && (
              <ClearIcon
                onClick={clearSearchWords}
                className="absolute top-2 right-2 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform transform hover:scale-110"
                style={{ fontSize: "1.5rem" }}
              />
            )}
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 justify-center">
            <Button
              onClick={searchAndHighlight}
              className="w-48 flex items-center justify-center p-2 text-sm"
            >
              buscar y contar
              <SearchIcon className="ml-1" />
            </Button>
            <Button
              onClick={clearAll}
              variant="outline"
              className="w-48 flex items-center justify-center p-2 text-sm"
            >
              limpiar todo
              <DeleteIcon className="ml-1" />
            </Button>
          </div>
          {highlightedText && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                Texto Resaltado:
              </h3>
              <div
                dangerouslySetInnerHTML={{ __html: highlightedText }}
                className="p-4 bg-white dark:bg-gray-700 rounded-md shadow dark:text-white"
              />
            </motion.div>
          )}
          {Object.keys(wordCount).length > 0 && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                Recuento de Palabras Buscadas:
              </h3>
              <ul className="list-none pl-0 space-y-2">
                {Object.entries(wordCount).map(([word, count]) => (
                  <li key={word} className="text-lg">
                    <span className="inline-block bg-blue-500 text-white font-bold px-2 py-1 rounded mr-2">
                      {word}
                    </span>
                    <span className="font-bold">{count}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          {notFoundWords.length > 0 && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-2 text-red-500">
                Palabras no encontradas:
              </h3>
              <ul className="pl-4 space-y-2 list-disc">
                {notFoundWords.map((word) => (
                  <li key={word} className="text-lg text-red-500">
                    {word} no se ha encontrado
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="text-center mt-4 flex flex-col items-center">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Designed with <span className="text-pink-500">❤️</span> by
            @codewithxavi
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <a
              title="GitHub"
              href="https://github.com/codewithxavi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform transform hover:scale-110"
            >
              <GitHubIcon fontSize="large" style={{ color: "black" }} />
            </a>
            <a
              title="YouTube"
              href="https://youtube.com/codewithxavi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform transform hover:scale-110"
            >
              <YouTubeIcon fontSize="large" style={{ color: "#FF0000" }} />
            </a>
            <a
              title="LinkedIn"
              href="https://linkedin.com/in/codewithxavi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform transform hover:scale-110"
            >
              <LinkedInIcon fontSize="large" style={{ color: "#0077B5" }} />
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
