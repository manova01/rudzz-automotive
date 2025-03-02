"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth/auth-provider"
import { Send } from "lucide-react"

type Message = {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: Date
  senderName: string
  senderImage: string | null
}

type Conversation = {
  id: string
  participantId: string
  participantName: string
  participantImage: string | null
  lastMessage: string
  lastMessageTime: Date
  unread: number
}

export default function MessagesPage() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    // Mock data for conversations
    const mockConversations: Conversation[] = [
      {
        id: "conv1",
        participantId: "provider1",
        participantName: "Auto Fix Garage",
        participantImage: null,
        lastMessage: "We can schedule your oil change for next Tuesday at 2 PM.",
        lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        unread: 1,
      },
      {
        id: "conv2",
        participantId: "provider2",
        participantName: "City Mechanics",
        participantImage: null,
        lastMessage: "Your brake inspection is complete. Everything looks good!",
        lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        unread: 0,
      },
      {
        id: "conv3",
        participantId: "provider3",
        participantName: "Express Oil Change",
        participantImage: null,
        lastMessage: "Thank you for your business! We hope to see you again soon.",
        lastMessageTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        unread: 0,
      },
    ]

    setConversations(mockConversations)
    setActiveConversation(mockConversations[0].id)
    setLoading(false)
  }, [user])

  useEffect(() => {
    if (!activeConversation) return

    // Mock data for messages in the active conversation
    const mockMessages: Message[] = [
      {
        id: "msg1",
        senderId: "provider1",
        receiverId: user?.id || "",
        content: "Hello! How can we help you today?",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        senderName: "Auto Fix Garage",
        senderImage: null,
      },
      {
        id: "msg2",
        senderId: user?.id || "",
        receiverId: "provider1",
        content: "I need to schedule an oil change for my car.",
        timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000), // 2.5 hours ago
        senderName: user?.name || "You",
        senderImage: user?.image,
      },
      {
        id: "msg3",
        senderId: "provider1",
        receiverId: user?.id || "",
        content: "We can schedule your oil change for next Tuesday at 2 PM.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        senderName: "Auto Fix Garage",
        senderImage: null,
      },
    ]

    setMessages(mockMessages)
  }, [activeConversation, user])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user || !activeConversation) return

    const activeConversationData = conversations.find((conv) => conv.id === activeConversation)

    if (!activeConversationData) return

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      senderId: user.id,
      receiverId: activeConversationData.participantId,
      content: newMessage,
      timestamp: new Date(),
      senderName: user.name || "You",
      senderImage: user.image,
    }

    setMessages([...messages, newMsg])

    // Update the conversation with the new message
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === activeConversation) {
        return {
          ...conv,
          lastMessage: newMessage,
          lastMessageTime: new Date(),
          unread: 0,
        }
      }
      return conv
    })

    setConversations(updatedConversations)
    setNewMessage("")
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Please log in</h1>
            <p className="mt-2 text-muted-foreground">You need to be logged in to view your messages</p>
            <Button asChild className="mt-4">
              <a href="/login">Login</a>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Messages</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-16rem)]">
            {/* Conversations List */}
            <Card className="md:col-span-1 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>Conversations</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y overflow-auto h-[calc(100vh-20rem)]">
                  {loading ? (
                    <div className="p-4 text-center">Loading conversations...</div>
                  ) : conversations.length === 0 ? (
                    <div className="p-4 text-center">No conversations yet</div>
                  ) : (
                    conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 cursor-pointer hover:bg-muted transition-colors ${
                          activeConversation === conversation.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setActiveConversation(conversation.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage
                              src={conversation.participantImage || undefined}
                              alt={conversation.participantName}
                            />
                            <AvatarFallback>{conversation.participantName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium truncate">{conversation.participantName}</h3>
                              <span className="text-xs text-muted-foreground">
                                {new Date(conversation.lastMessageTime).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                            {conversation.unread > 0 && (
                              <div className="mt-1 flex justify-end">
                                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs">
                                  {conversation.unread}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card className="md:col-span-2 flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle>
                  {activeConversation
                    ? conversations.find((c) => c.id === activeConversation)?.participantName
                    : "Select a conversation"}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                {!activeConversation ? (
                  <div className="flex-1 flex items-center justify-center p-4">
                    <p className="text-muted-foreground">Select a conversation to view messages</p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === user.id ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex gap-2 max-w-[80%] ${
                              message.senderId === user.id ? "flex-row-reverse" : ""
                            }`}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={message.senderImage || undefined} alt={message.senderName} />
                              <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div
                                className={`rounded-lg p-3 ${
                                  message.senderId === user.id ? "bg-primary text-primary-foreground" : "bg-muted"
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          handleSendMessage()
                        }}
                        className="flex gap-2"
                      >
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button type="submit" size="icon">
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

