import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  timestamp: string;
  category: string;
  image?: string;
  comments: Comment[];
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  
  const [articles, setArticles] = useState<NewsArticle[]>([
    {
      id: 1,
      title: "Новые технологии в телевещании изменят индустрию",
      summary: "Революционные разработки в области цифрового вещания открывают новые возможности для создателей контента",
      content: "Индустрия телевещания переживает кардинальные изменения благодаря внедрению новых технологий. Искусственный интеллект, облачные сервисы и улучшенные алгоритмы сжатия видео позволяют создавать контент высочайшего качества.",
      timestamp: "2 часа назад",
      category: "Технологии",
      comments: [
        {
          id: 1,
          author: "Александр М.",
          content: "Очень интересная статья! Действительно, технологии развиваются стремительно.",
          timestamp: "1 час назад"
        }
      ]
    },
    {
      id: 2,
      title: "Интервью с ведущими продюсерами TeleВИД",
      summary: "Эксклюзивный разговор о будущем российского телевидения и новых форматах передач",
      content: "В эксклюзивном интервью ведущие продюсеры TeleВИД поделились своим видением развития отечественного телевидения. Обсуждались новые форматы, интерактивные технологии и планы на ближайшие годы.",
      timestamp: "5 часов назад",
      category: "Интервью",
      comments: []
    },
    {
      id: 3,
      title: "Анализ телевизионного рынка за последний квартал",
      summary: "Подробный обзор тенденций, рейтингов и перспектив развития телевизионной индустрии",
      content: "Последний квартал показал значительные изменения в предпочтениях зрителей. Стриминговые платформы продолжают набирать популярность, однако традиционное телевидение адаптируется к новым реалиям.",
      timestamp: "1 день назад",
      category: "Аналитика",
      comments: [
        {
          id: 2,
          author: "Мария К.",
          content: "Полезная аналитика, спасибо за детальный разбор!",
          timestamp: "12 часов назад"
        },
        {
          id: 3,
          author: "Дмитрий П.",
          content: "Интересно было бы увидеть сравнение с европейскими показателями.",
          timestamp: "8 часов назад"
        }
      ]
    }
  ]);

  const handleAddComment = (articleId: number) => {
    if (!newComment.trim() || !commentAuthor.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      author: commentAuthor,
      content: newComment,
      timestamp: "только что"
    };

    setArticles(articles.map(article => 
      article.id === articleId 
        ? { ...article, comments: [...article.comments, comment] }
        : article
    ));

    setNewComment('');
    setCommentAuthor('');
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
                TeleВИД
              </h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-black transition-colors">Новости</a>
                <a href="#" className="text-gray-700 hover:text-black transition-colors">О нас</a>
                <a href="#" className="text-gray-700 hover:text-black transition-colors">Контакты</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Поиск новостей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 border-gray-300 focus:border-black"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold text-black mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
              Последние новости
            </h2>
            
            {filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">{article.timestamp}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-black hover:text-gray-700 cursor-pointer transition-colors" 
                             style={{ fontFamily: 'Arial, sans-serif' }}>
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    {article.summary}
                  </p>
                  <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    {article.content}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedArticle(selectedArticle === article.id ? null : article.id)}
                      className="flex items-center space-x-2"
                    >
                      <Icon name="MessageCircle" size={16} />
                      <span>Комментарии ({article.comments.length})</span>
                    </Button>
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <Icon name="Heart" size={16} />
                        <span>Нравится</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <Icon name="Share" size={16} />
                        <span>Поделиться</span>
                      </Button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {selectedArticle === article.id && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-black mb-4">Комментарии</h4>
                      
                      {/* Existing Comments */}
                      <div className="space-y-4 mb-6">
                        {article.comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                                {comment.author.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-sm text-black">{comment.author}</span>
                                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                </div>
                                <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Comment Form */}
                      <div className="space-y-3">
                        <Input
                          placeholder="Ваше имя"
                          value={commentAuthor}
                          onChange={(e) => setCommentAuthor(e.target.value)}
                          className="border-gray-300"
                        />
                        <Textarea
                          placeholder="Написать комментарий..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="resize-none border-gray-300"
                          rows={3}
                        />
                        <Button
                          onClick={() => handleAddComment(article.id)}
                          className="bg-black text-white hover:bg-gray-800"
                          disabled={!newComment.trim() || !commentAuthor.trim()}
                        >
                          Отправить комментарий
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Категории
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['Технологии', 'Интервью', 'Аналитика', 'Новости отрасли', 'Обзоры'].map((category) => (
                    <a
                      key={category}
                      href="#"
                      className="block text-gray-700 hover:text-black transition-colors py-1"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Articles */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Популярное
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {articles.slice(0, 3).map((article) => (
                    <div key={`popular-${article.id}`} className="border-b border-gray-100 pb-3 last:border-b-0">
                      <h4 className="font-medium text-sm text-black hover:text-gray-700 cursor-pointer line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{article.timestamp}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
                  О TeleВИД
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700" style={{ fontFamily: 'Georgia, serif' }}>
                  Ведущий новостной портал о телевизионной индустрии. 
                  Актуальные новости, аналитические материалы и эксклюзивные интервью.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-black mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                TeleВИД
              </h3>
              <p className="text-sm text-gray-600">
                © 2024 TeleВИД. Все права защищены.
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <Icon name="Mail" size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <Icon name="Phone" size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <Icon name="Globe" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;