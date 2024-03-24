import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { fetchAsyncMessages } from "./api";
import { MessageProps, MessageState } from "../types";
import { useAuthContext } from "../auth/AuthContext";

export const useIntersection = (
  ref: React.MutableRefObject<HTMLDivElement>
) => {
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    observer.observe(ref.current);

    return () => {
      observer.unobserve(ref.current);
    };
  });

  return intersecting;
};

const timeSince = (timestamp: string) => {
  const now = new Date();
  const messageTime = new Date(timestamp);
  const secondsAgo = Math.floor((now.getTime() - messageTime.getTime()) / 1000);

  if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    return `${Math.floor(secondsAgo / 60)} minutes ago`;
  } else if (secondsAgo < 86400) {
    return `${Math.floor(secondsAgo / 3600)} hours ago`;
  } else {
    return `${Math.floor(secondsAgo / 86400)} days ago`;
  }
};

const Messages: React.FC<MessageProps> = (props) => {
  const { user } = useAuthContext();
  const containerRef = useRef<HTMLDivElement>(null); // コンテナ用のref

  const [scrollHeightBeforeLoading, setScrollHeightBeforeLoading] = useState(0);

  // 無限スクロールのプロパティ
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ番号
  const loadingRef = useRef(null); // 無限スクロールのトリガーとなる要素への参照
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // チャットルームIDが変わったら初期メッセージを読み込み
    const fetchInitialMessages = async () => {
      setIsLoading(true);

      if (props.chatRoomId) {
        const res = await fetchAsyncMessages(props.chatRoomId, 1);
        props.setMessages(res.messages.reverse());
        setIsLoading(false);
        if (res.currentPage < res.totalPages) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      }
    };
    setCurrentPage(1);
    setScrollHeightBeforeLoading(0);
    fetchInitialMessages();
  }, [props.chatRoomId]);

  useEffect(() => {
    const fetchAddMessages = async (page: number) => {
      setIsLoading(true); // ローディング開始
      if (props.chatRoomId) {
        const res = await fetchAsyncMessages(props.chatRoomId, page);
        props.setMessages((prevMessages) => [
          ...res.messages.reverse(),
          ...prevMessages,
        ]);
        setIsLoading(false); // ローディング終了
        // メッセージがこれ以上ないかどうかを判断
        if (res.currentPage < res.totalPages) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      }
    };

    if (hasMore && !isLoading && currentPage > 1) {
      fetchAddMessages(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          if (containerRef.current) {
            setScrollHeightBeforeLoading(containerRef.current.scrollHeight);
          }
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [isLoading, hasMore]);

  // isLoadingがfalseになった時に実行
  useEffect(() => {
    if (!isLoading && containerRef.current) {
      const newScrollHeight = containerRef.current.scrollHeight;

      // 読み込み前後のscrollHeightの差分を計算
      const scrollOffset = newScrollHeight - scrollHeightBeforeLoading;

      // 計算した差分だけスクロール
      containerRef.current.scrollBy(0, scrollOffset);
    }
  }, [isLoading, scrollHeightBeforeLoading]);

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
      ref={containerRef}
    >
      {hasMore && <div ref={loadingRef}>Loading more items...</div>}
      {props.messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            display: "flex",
            p: 2,
            gap: 3,
            flexDirection: user?.id === message.sender ? "row-reverse" : "row",
          }}
        >
          <Box>
            <img
              src={`http://localhost:8000${message.icon}`}
              alt={`s icon`}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                backgroundColor: "white",
              }}
            />
            <Typography color={"gray"}>
              {timeSince(message.timestamp)}
            </Typography>
          </Box>
          <Box sx={{ maxWidth: "40%" }}>
            <Typography
              align="left"
              sx={{
                bgcolor: "secondary.light",
                p: 2,
              }}
            >
              {message.content}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Messages;
