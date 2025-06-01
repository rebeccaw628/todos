package projects.nology.todo.config;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import projects.nology.todo.task.CreateTaskDTO;
import projects.nology.todo.task.Task;

@Configuration
public class ModelMapperConfig {
    
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        modelMapper.typeMap(String.class, String.class).setConverter(new StringTrimConverter());
        modelMapper.typeMap(CreateTaskDTO.class, Task.class)
                    .addMappings(mapper -> mapper.using(new StringToLocalDateConverter())
                    .map(CreateTaskDTO::getDueDate,Task::setDueDate));
        return modelMapper;
    }

    private class StringTrimConverter implements Converter<String, String> {

        @Override
        public String convert(MappingContext<String, String> context) {
            if (context.getSource() == null) {
                return null;
            }
            return context.getSource().trim();
        }
        
    }

    private class StringToLocalDateConverter implements Converter<String, LocalDate> {

        private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-mmm-yyyy");

        @Override
        public LocalDate convert(MappingContext<String, LocalDate> context) {
            if (context.getSource() == null || context.getSource().isBlank()) {
                return null;
            }
            return LocalDate.parse(context.getSource(), formatter);
            
        }
        
    }
}
