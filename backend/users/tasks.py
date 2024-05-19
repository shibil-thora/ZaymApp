from celery import shared_task 

@shared_task(bind=True)
def my_task(self): 
    result = 5
    for i in range(1000): 
        result += 5 
    print(result, 'heiiii ')
    return 5