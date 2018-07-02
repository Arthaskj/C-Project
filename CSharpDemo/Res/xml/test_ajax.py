headers = {  
    'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6'  
}  

def test_ajax(request):
    print(request.method)
    h = request.POST.get('hostname')
    i = request.POST.get('ip')
    p = request.POST.get('port')
    b = request.POST.get('b_id')
    print(h,i,p,b)
    if h and len(h) > 5:        # 主机名长度判断
        models.Host.objects.create(hostname=h,ip=i,port=p,b_id=b) # 创建数据
        return HttpResponse("OK")　　　　# 返回OK 严格大小写
    else:
        return HttpResponse("主机名太短")　　# 返回错误提示