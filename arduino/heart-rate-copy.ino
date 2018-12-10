// Function: This program can be used to measure heart rate, the lowest pulse in the program be set to 30.
    //         Use an external interrupt to measure it.
    // Hardware: Grove - Ear-clip Heart Rate Sensor, Grove - Base Shield, Grove - LED
    // Arduino IDE: Arduino-1.0
    // Author: FrankieChu     
    // updated by iain nash   (plz dont judge the quality)
    // Date: Jan 22, 2013
    // Version: v1.3
    // by www.seeedstudio.com
    #define LED 13//indicator, Grove - LED is connected with D4 of Arduino
    boolean led_state = LOW;//state of LED, each time an external interrupt 
                                    //will change the state of LED
    unsigned char counter;
    unsigned long temp[21];
    unsigned long sub;
    bool data_effect=true;
    unsigned int heart_rate;//the measurement result of heart rate

    unsigned char counter2;
    unsigned long temp2[21];
    unsigned long sub2;
    bool data_effect2=true;
    unsigned int heart_rate2;//the measurement result of heart rate


    const int max_heartpluse_duty = 2000;//you can change it follow your system's request.
                            //2000 meams 2 seconds. System return error 
                            //if the duty overtrip 2 second.
    void setup()
    {
        pinMode(LED, OUTPUT);
        Serial.begin(9600);
        //Serial.println("Please ready your chest belt.");
        delay(1000);
        arrayInit();
        array2Init();
        Serial.println("Heart rate test begin.");
        attachInterrupt(digitalPinToInterrupt(2), interrupt, RISING);//set interrupt 0,digital port 2
        attachInterrupt(digitalPinToInterrupt(3), interrupt2, RISING);//set interrupt 1,digital port 3
    }
    void loop()
    {
        digitalWrite(LED, led_state);//Update the state of the indicator
    }
    /*Function: calculate the heart rate*/
    void sum()
    {
     if(data_effect)
        {
          heart_rate=1200000/(temp[20]-temp[0]);//60*20*1000/20_total_time 
          Serial.print("r:1:");
          Serial.println(heart_rate);
        }
       data_effect=1;//sign bit
    }
    /*Function: calculate the heart rate*/
    void sum2()
    {
     if(data_effect2)
        {
          heart_rate2=1200000/(temp2[20]-temp2[0]);//60*20*1000/20_total_time 
          Serial.print("r:2:");
          Serial.println(heart_rate2);
        }
       data_effect2=1;//sign bit
    }
    /*Function: Interrupt service routine.Get the sigal from the external interrupt*/
    void interrupt()
    {
      Serial.println("b:1");
        temp[counter]=millis();
        Serial.println(counter,DEC);
        Serial.println(temp[counter]);
        switch(counter)
        {
            case 0:
                sub=temp[counter]-temp[20];
                Serial.println(sub);
                break;
            default:
                sub=temp[counter]-temp[counter-1];
                Serial.println(sub);
                break;
        }
        if(sub>max_heartpluse_duty)//set 2 seconds as max heart pluse duty
        {
            data_effect=0;//sign bit
            counter=0;
            Serial.println("Heart rate measure error,test will restart!" );
            arrayInit();
        }
        if (counter==20&&data_effect)
        {
            counter=0;
            sum();
        }
        else if(counter!=20&&data_effect)
        counter++;
        else 
        {
            counter=0;
            data_effect=1;
        }

    }

    /*Function: Interrupt service routine.Get the sigal from the external interrupt*/
    void interrupt2()
    {
        temp2[counter2]=millis();
        Serial.println(counter2,DEC);
        Serial.println(temp2[counter2]);
        Serial.println("b:2");
        switch(counter2)
        {
            case 0:
                sub=temp2[counter2]-temp2[20];
                Serial.println(sub2);
                break;
            default:
                sub=temp2[counter2]-temp2[counter2-1];
                Serial.println(sub2);
                break;
        }
        if(sub2>max_heartpluse_duty)//set 2 seconds as max heart pluse duty
        {
            data_effect2=0;//sign bit
            counter2=0;
            Serial.println("Heart rate measure error,test will restart!" );
            array2Init();
        }
        if (counter2==20&&data_effect2)
        {
            counter2=0;
            sum2();
        }
        else if(counter2!=20&&data_effect2)
        counter2++;
        else 
        {
            counter2=0;
            data_effect2=1;
        }

    }
    
    /*Function: Initialization for the array(temp)*/
    void arrayInit()
    {
        for(unsigned char i=0;i < 20;i ++)
        {
            temp[i]=0;
        }
        temp[20]=millis();
    }
        /*Function: Initialization for the array(temp)*/
    void array2Init()
    {
        for(unsigned char i=0;i < 20;i ++)
        {
            temp2[i] = 0;
        }
        temp2[20]=millis();
    }